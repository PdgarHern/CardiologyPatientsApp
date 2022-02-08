class CreateFollowupsParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :followups_parameters do |t|
      t.references :followup, null: false, foreign_key: true
      t.references :parameter, null: false, foreign_key: true

      t.timestamps
    end
  end
end
