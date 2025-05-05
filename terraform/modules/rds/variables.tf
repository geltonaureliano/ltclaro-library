variable "prefix" {
  description = "Resource naming prefix"
  type        = string
}

variable "environment" {
  description = "Environment (development, staging, production)"
  type        = string
}

variable "subnet_ids" {
  description = "Subnet IDs where RDS will be created"
  type        = list(string)
}

variable "security_group_id" {
  description = "Security group ID for RDS"
  type        = string
}

variable "instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.small"
}

variable "allocated_storage" {
  description = "Allocated storage size in GB"
  type        = number
  default     = 20
}

variable "max_allocated_storage" {
  description = "Maximum allocated storage size in GB for autoscaling"
  type        = number
  default     = 100
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "library"
}

variable "database_username" {
  description = "Database username"
  type        = string
  default     = "library_user"
}

variable "database_password" {
  description = "Database password"
  type        = string
  sensitive   = true
} 