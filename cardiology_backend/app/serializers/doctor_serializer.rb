class DoctorSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :phoneNumber, :user_id, :img

  def img
    if object.img.attached?
      {
        url: rails_blob_url(object.img)
      }
    end
  end
  
end
