# Provider configuration
provider "aws" {
  region = "ca-central-1"  # matches with AWS CLI region config
}

# S3 bucket for website hosting
resource "aws_s3_bucket" "website" {
  bucket = "expense-tracker-aizm"  # needs to be globally unique
}

# Configure website hosting
resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "oai" {
    comment = "OAI for expense tracker website"
}

# Update bucket policy to allow CloudFront Access
resource "aws_s3_bucket_policy" "website" {
    bucket = aws_s3_bucket.website.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Sid = "PublicReadGetObject"
                Effect = "Allow"
                Principal = {
                    AWS = aws_cloudfront_origin_access_identity.oai.iam_arn
                }
                Action = "s3:GetObject"
                Resource = "${aws_s3_bucket.website.arn}/*"
            }
        ]
    })
}

# CloudFront distribution
resource "aws_cloudfront_distribution" "website" {
    enabled = true
    is_ipv6_enabled = true 
    default_root_object = "index.html"

    origin {
        domain_name = aws_s3_bucket.website.bucket_regional_domain_name
        origin_id = aws_s3_bucket.website.id

        s3_origin_config {
            origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
        }
    }
}

default_cache_behaviour {
    allowed_methods = ["GET", "HEAD"]
    cached_methods = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.website.id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
        query_string = false 
        cookies {
            forward = "none"
        }
    }
}

restrictions {
    geo_restriction {
        restriction_type = "none"
    }
}

viewer_certificate {
    cloudfront_default_certificate = true
}

# Handle React Router
custom_error_response {
    error_code = 403
    response_code = 200
    response_page_path = "/index.html"
}

custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
}

# Output both URLs
output "website_url" {
    value = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "cloudfront_url" {
    value = aws_cloudfront_distribution.website.domain_name
}