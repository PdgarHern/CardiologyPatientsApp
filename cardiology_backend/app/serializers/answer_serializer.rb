class AnswerSerializer < ActiveModel::Serializer
  attributes :id, :value, :timestamps, :parameter_id, :followup_id, :hospital_id
end
