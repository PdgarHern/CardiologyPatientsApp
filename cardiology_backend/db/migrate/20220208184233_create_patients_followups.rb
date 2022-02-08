class CreatePatientsFollowups < ActiveRecord::Migration[6.1]
  def change
    create_table :patients_followups, id: false do |t|
      t.belongs_to :patient
      t.belongs_to :followup
    end
  end
end
