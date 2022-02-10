class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.string :value
      t.references :parameter, foreign_key: true
      t.references :followup, foreign_key: true
      t.references :hospital, foreign_key: true

      t.timestamps
    end
  end
end
