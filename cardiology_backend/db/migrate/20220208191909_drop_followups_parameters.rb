class DropFollowupsParameters < ActiveRecord::Migration[6.1]
  def change
    drop_table :followups_parameters
    drop_table :patients_followups
  end
end
