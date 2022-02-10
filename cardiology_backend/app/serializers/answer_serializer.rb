class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_at, :parameter_id, :followup_id, :hospital_id
end
