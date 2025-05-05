output "db_instance_address" {
  description = "RDS instance address"
  value       = aws_db_instance.main.address
}

output "db_instance_endpoint" {
  description = "RDS connection endpoint"
  value       = aws_db_instance.main.endpoint
}

output "db_instance_name" {
  description = "Database name"
  value       = aws_db_instance.main.name
}

output "db_instance_username" {
  description = "RDS username"
  value       = aws_db_instance.main.username
  sensitive   = true
}

output "db_instance_port" {
  description = "RDS port"
  value       = aws_db_instance.main.port
}

output "database_url" {
  description = "Database connection string (SSM Parameter ARN)"
  value       = aws_ssm_parameter.database_url.arn
} 