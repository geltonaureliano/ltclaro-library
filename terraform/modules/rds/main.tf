resource "aws_db_subnet_group" "main" {
  name       = "${var.prefix}-db-subnet-group"
  subnet_ids = var.subnet_ids

  tags = {
    Name = "${var.prefix}-db-subnet-group"
  }
}

resource "aws_db_parameter_group" "main" {
  name   = "${var.prefix}-db-parameter-group"
  family = "postgres14"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  tags = {
    Name = "${var.prefix}-db-parameter-group"
  }
}

resource "aws_db_instance" "main" {
  identifier             = "${var.prefix}-database"
  engine                 = "postgres"
  engine_version         = "14"
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  max_allocated_storage  = var.max_allocated_storage
  storage_type           = "gp2"
  db_name                = var.database_name
  username               = var.database_username
  password               = var.database_password
  port                   = 5432
  publicly_accessible    = false
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.security_group_id]
  parameter_group_name   = aws_db_parameter_group.main.name
  skip_final_snapshot    = true
  deletion_protection    = var.environment == "production"
  backup_retention_period = var.environment == "production" ? 7 : 1
  multi_az               = var.environment == "production"
  storage_encrypted      = true

  tags = {
    Name        = "${var.prefix}-database"
    Environment = var.environment
  }
}

# SSM Parameter to store connection string
resource "aws_ssm_parameter" "database_url" {
  name        = "/${var.prefix}/${var.environment}/DATABASE_URL"
  description = "PostgreSQL database connection string"
  type        = "SecureString"
  value       = "postgresql://${var.database_username}:${var.database_password}@${aws_db_instance.main.endpoint}/${var.database_name}"

  tags = {
    Environment = var.environment
  }
} 