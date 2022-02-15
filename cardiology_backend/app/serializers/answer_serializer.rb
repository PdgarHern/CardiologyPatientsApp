class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at, :hospital_id

  belongs_to :parameter
  belongs_to :followup
end
