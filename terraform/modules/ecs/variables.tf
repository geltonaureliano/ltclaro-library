variable "prefix" {
  description = "Resource naming prefix"
  type        = string
}

variable "environment" {
  description = "Environment (development, staging, production)"
  type        = string
}

variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
}

variable "task_cpu" {
  description = "CPU units for ECS task"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Memory for ECS task in MiB"
  type        = number
  default     = 512
}

variable "container_port" {
  description = "Application container port"
  type        = number
  default     = 3000
}

variable "service_desired_count" {
  description = "Desired count of running ECS tasks"
  type        = number
  default     = 2
}

variable "min_capacity" {
  description = "Minimum capacity for auto scaling"
  type        = number
  default     = 2
}

variable "max_capacity" {
  description = "Maximum capacity for auto scaling"
  type        = number
  default     = 10
}

variable "log_retention_days" {
  description = "CloudWatch logs retention period in days"
  type        = number
  default     = 30
}

variable "subnet_ids" {
  description = "Subnet IDs where ECS tasks will run"
  type        = list(string)
}

variable "security_group_id" {
  description = "Security group ID for ECS tasks"
  type        = string
}

variable "target_group_arn" {
  description = "ARN of the target group for load balancer"
  type        = string
}

variable "execution_role_arn" {
  description = "IAM role ARN for task execution"
  type        = string
}

variable "task_role_arn" {
  description = "IAM role ARN for tasks"
  type        = string
}

variable "container_environment" {
  description = "Environment variables for the container"
  type        = list(object({
    name  = string
    value = string
  }))
  default = []
}

variable "container_secrets" {
  description = "Secrets for the container"
  type        = list(object({
    name      = string
    valueFrom = string
  }))
  default = []
}

variable "load_balancer_depends_on" {
  description = "Dependencies for the load balancer"
  default     = null
} 