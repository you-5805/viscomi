class User < ApplicationRecord
  attr_accessor :activation_token, :reset_token
  before_save :downcase_email
  before_create :create_activation_digest

  has_secure_password
  has_one :community_center
  has_one_attached :image

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  validates :name,
    presence: true,
    length: { maximum: 25 }

  validates :password,
    presence: true,
    length: { minimum: 6 },
    allow_nil: true

  validates :email,
  presence: true,
  length: { maximum: 255 },
  format: { with: VALID_EMAIL_REGEX },
  uniqueness: true

  validates :image,
    content_type: {
      in: %w[image/jpeg image/gif image/png],
      message: "jpg、gif、png形式のものを利用してください。"
    },
    size: {
      less_than: 5.megabytes,
      message: "5MB以下のファイルを利用してください。"
    }

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def activate
    update_attribute(:activated, true)
  end
  
  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  def small_image
    image.variant(resize_to_fill: [120, 120])
  end

  def big_image
    image.variant(resize_to_limit: [300, 300])
  end

  def new_community_center(community_center_name)
    update_attribute(:is_manager, true)
    create_community_center(
      name: community_center_name,
      community_center_id: SecureRandom.base64(9)
    )
  end

  private

    def downcase_email
      self.email.downcase!
    end

    def create_activation_digest
      self.activation_token = User.new_token
      self.activation_digest = User.digest(activation_token)
    end
end
