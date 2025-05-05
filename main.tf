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

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "ltclaro_library"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

# VPC and Network Configuration
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "ltclaro-library-vpc"
  }
}

# RDS Instance
resource "aws_db_instance" "postgres" {
  identifier           = "ltclaro-library-db"
  engine              = "postgres"
  engine_version      = "14"
  instance_class      = "db.t3.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  
  db_name             = var.database_name
  username           = "ltclaro_user"
  password           = "ltclaro_password" # Use AWS Secrets Manager in production
  
  skip_final_snapshot = true # Set to false in production
  
  vpc_security_group_ids = [aws_security_group.rds.id]
  
  tags = {
    Environment = var.environment
  }
}

# Security Group for RDS
resource "aws_security_group" "rds" {
  name        = "ltclaro-library-rds-sg"
  description = "Security group for RDS instance"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "ltclaro-library-cluster"
}

# ALB
resource "aws_lb" "main" {
  name               = "ltclaro-library-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets           = aws_vpc.main.public_subnets

  tags = {
    Environment = var.environment
  }
}

# Security Group for ALB
resource "aws_security_group" "alb" {
  name        = "ltclaro-library-alb-sg"
  description = "Security group for ALB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app" {
  family                   = "ltclaro-library"
  requires_compatibilities = ["FARGATE"]
  network_mode            = "awsvpc"
  cpu                     = 256
  memory                  = 512

  container_definitions = jsonencode([
    {
      name  = "ltclaro-library"
      image = "ltclaro-library:latest" # Update with your ECR repository
      
      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "DATABASE_URL"
          value = "postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}"
        }
      ]
      
      portMappings = [
        {
          containerPort = 3000
          hostPort     = 3000
          protocol     = "tcp"
        }
      ]
    }
  ])
}

# Outputs
output "rds_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
} 