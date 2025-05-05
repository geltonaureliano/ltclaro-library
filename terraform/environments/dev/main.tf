provider "aws" {
  region = var.aws_region
}

locals {
  project_name = "library"
  environment  = "dev"
  prefix       = "${local.project_name}-${local.environment}"
}

data "aws_caller_identity" "current" {}

################################################################################
# VPC
################################################################################
module "vpc" {
  source = "../../modules/vpc"

  prefix             = local.prefix
  vpc_cidr           = var.vpc_cidr
  public_subnet_cidrs  = var.public_subnet_cidrs
  private_subnet_cidrs = var.private_subnet_cidrs
  availability_zones   = var.availability_zones
  app_port             = var.app_port
}

################################################################################
# RDS
################################################################################
module "rds" {
  source = "../../modules/rds"

  prefix               = local.prefix
  environment          = local.environment
  subnet_ids           = module.vpc.private_subnet_ids
  security_group_id    = module.vpc.rds_security_group_id
  instance_class       = var.db_instance_class
  allocated_storage    = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  database_name        = var.database_name
  database_username    = var.database_username
  database_password    = var.database_password
}

################################################################################
# IAM
################################################################################
module "iam" {
  source = "../../modules/iam"

  project_name            = local.project_name
  environment             = local.environment
  aws_region              = var.aws_region
  aws_account_id          = data.aws_caller_identity.current.account_id
  cloudwatch_log_group_arn = module.cloudwatch.log_group_arn
}

################################################################################
# CloudWatch
################################################################################
module "cloudwatch" {
  source = "../../modules/cloudwatch"

  project_name      = local.project_name
  environment       = local.environment
  aws_region        = var.aws_region
  log_retention_days = var.log_retention_days
  alb_arn_suffix    = module.alb.alb_arn
  sns_topic_arn     = var.sns_topic_arn
}

################################################################################
# ALB
################################################################################
module "alb" {
  source = "../../modules/alb"

  project_name         = local.project_name
  environment          = local.environment
  vpc_id               = module.vpc.vpc_id
  public_subnet_ids    = module.vpc.public_subnet_ids
  alb_security_group_id = module.vpc.alb_security_group_id
  certificate_arn      = var.certificate_arn
  create_dns_record    = var.create_dns_record
  route53_zone_id      = var.route53_zone_id
  domain_name          = var.domain_name
}

################################################################################
# ECS
################################################################################
module "ecs" {
  source = "../../modules/ecs"

  prefix                 = local.prefix
  environment            = local.environment
  aws_region             = var.aws_region
  task_cpu               = var.task_cpu
  task_memory            = var.task_memory
  container_port         = var.app_port
  service_desired_count  = var.service_desired_count
  min_capacity           = var.min_capacity
  max_capacity           = var.max_capacity
  log_retention_days     = var.log_retention_days
  subnet_ids             = module.vpc.private_subnet_ids
  security_group_id      = module.vpc.ecs_tasks_security_group_id
  target_group_arn       = module.alb.target_group_arn
  execution_role_arn     = module.iam.ecs_task_execution_role_arn
  task_role_arn          = module.iam.ecs_task_role_arn
  
  container_environment = [
    {
      name  = "NODE_ENV"
      value = "development"
    },
    {
      name  = "APP_PORT"
      value = tostring(var.app_port)
    }
  ]
  
  container_secrets = [
    {
      name      = "DATABASE_URL"
      valueFrom = module.rds.database_url
    }
  ]
  
  load_balancer_depends_on = module.alb.https_listener_arn
} 