class AddHospitalToPatients < ActiveRecord::Migration[6.1]
  def change
    add_reference :patients, :hospital, null: true, foreign_key: true
  end
end
