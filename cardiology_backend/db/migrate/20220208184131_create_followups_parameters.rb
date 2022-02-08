class CreateFollowupsParameters < ActiveRecord::Migration[6.1]
  def change
    create_table :followups_parameters, id: false do |t|
      t.belongs_to :followup
      t.belongs_to :parameter
    end
  end
end
