class PatientSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :clinicRecord, :gender, :birthDate, :phoneNumber, :consentRGPD, :user_id, :img

  def img
    if object.img.attached?
      {
        url: rails_blob_url(object.img)
      }
    end
  end
  
end
