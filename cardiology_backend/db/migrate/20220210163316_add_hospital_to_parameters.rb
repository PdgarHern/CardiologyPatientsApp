class AddHospitalToParameters < ActiveRecord::Migration[6.1]
  def change
    add_reference :parameters, :hospital, null: false, foreign_key: true
  end
end
