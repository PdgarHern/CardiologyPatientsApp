class CreateFollowuptemplatesParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :followuptemplates_parameters do |t|
      t.references :followuptemplate, null: false, foreign_key: true
      t.references :parameter, null: false, foreign_key: true

      t.timestamps
    end
  end
end
