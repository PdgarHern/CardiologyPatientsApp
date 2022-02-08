class CreateFollowups < ActiveRecord::Migration[6.1]
  def change
    create_table :followups do |t|
      t.string :startDate
      t.string :endDate
      t.references :doctor, foreign_key: true

      t.timestamps
    end
  end
end
