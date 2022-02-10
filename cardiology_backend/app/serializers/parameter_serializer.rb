class ParameterSerializer < ActiveModel::Serializer
  attributes :id, :name, :kind, :frequency, :hospital_id, :followuptemplates
end
