class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :name
      t.references :patient, null: false, foreign_key: true
      t.references :doctor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
