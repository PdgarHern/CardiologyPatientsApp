class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :value
      t.references :chat, null: false, foreign_key: true
      t.references :patient, null: true, foreign_key: true
      t.references :doctor, null: true, foreign_key: true

      t.timestamps
    end
  end
end
