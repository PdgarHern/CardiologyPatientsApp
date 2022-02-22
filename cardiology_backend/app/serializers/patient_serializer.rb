class PatientSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :clinicRecord, :gender, :birthDate, :phoneNumber, :consentRGPD, :user_id, :hospital_id, :followups, :img

  has_many :chats

  def img
    if object.img.attached?
      {
        url: rails_blob_url(object.img)
      }
    end
  end
  
end
