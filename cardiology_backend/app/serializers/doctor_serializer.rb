class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :name, :phoneNumber, :user_id
end
