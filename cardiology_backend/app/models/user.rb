class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
        #  :omniauthable,
         jwt_revocation_strategy: JwtDenylist
        #  omniauth_providers: %i[google_oauth2]
  has_one :doctor, dependent: :destroy
  has_one :patient, dependent: :destroy

  def self.from_omniauth(auth)
    
  end
end
