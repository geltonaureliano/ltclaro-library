terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "../../modules/vpc"
  environment = var.environment
  vpc_cidr    = var.vpc_cidr
}

module "rds" {
  source = "../../modules/rds"
  
  environment       = var.environment
  prefix           = var.project_name
  database_name    = var.database_name
  database_password = var.db_password
  security_group_id = aws_security_group.rds.id
  subnet_ids       = module.vpc.private_subnet_ids
}

module "ecs" {
  source = "../../modules/ecs"
  
  environment       = var.environment
  vpc_id           = module.vpc.vpc_id
  private_subnets  = module.vpc.private_subnet_ids
  app_image        = var.app_image
  container_port   = var.container_port
  database_url     = module.rds.database_url
}

module "alb" {
  source = "../../modules/alb"
  
  environment      = var.environment
  vpc_id          = module.vpc.vpc_id
  public_subnets  = module.vpc.public_subnet_ids
  ecs_service_id  = module.ecs.service_id
  container_port  = var.container_port
}

module "cloudwatch" {
  source = "../../modules/cloudwatch"
  
  environment = var.environment
  app_name    = var.app_name
}

module "iam" {
  source = "../../modules/iam"
  
  environment = var.environment
  app_name    = var.app_name
} 