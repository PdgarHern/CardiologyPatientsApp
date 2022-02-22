class ChatSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :patient
  has_one :doctor
  has_many :messages
end
