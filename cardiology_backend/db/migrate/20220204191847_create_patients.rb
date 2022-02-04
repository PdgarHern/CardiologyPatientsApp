class CreatePatients < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.string :name
      t.string :clinicRecord
      t.string :gender
      t.string :birthDate
      t.integer :phoneNumber
      t.boolean :consentRGPD
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
