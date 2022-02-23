class Message < ApplicationRecord
  belongs_to :chat
  scope :sort_by_reverse_id_asc, lambda { order("REVERSE(id) ASC")}
  # belongs_to :patient
  # belongs_to :doctor
end
