class AddHospitalToDoctors < ActiveRecord::Migration[6.1]
  def change
    add_reference :doctors, :hospital, null: true, foreign_key: true
  end
end
