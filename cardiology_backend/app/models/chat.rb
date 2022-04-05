class Chat < ApplicationRecord
  belongs_to :patient
  belongs_to :doctor
  has_many :messages, dependent: :delete_all

  paginates_per 10
end
