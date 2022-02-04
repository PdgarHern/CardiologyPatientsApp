class CreateDoctors < ActiveRecord::Migration[6.1]
  def change
    create_table :doctors do |t|
      t.string :name
      t.integer :phoneNumber
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
