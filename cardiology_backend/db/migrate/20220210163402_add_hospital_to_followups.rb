class AddHospitalToFollowups < ActiveRecord::Migration[6.1]
  def change
    add_reference :followups, :hospital, null: false, foreign_key: true
    add_reference :followups, :patient, null: false, foreign_key: true
  end
end
