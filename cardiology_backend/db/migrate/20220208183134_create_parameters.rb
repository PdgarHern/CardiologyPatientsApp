class CreateParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :parameters do |t|
      t.string :name
      t.string :kind
      t.string :frequency

      t.timestamps
    end
  end
end
