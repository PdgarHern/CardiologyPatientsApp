class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist
  has_one :doctor, dependent: :delete
  has_one :patient, dependent: :delete
end
