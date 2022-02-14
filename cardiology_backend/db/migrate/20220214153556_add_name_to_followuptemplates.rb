class AddNameToFollowuptemplates < ActiveRecord::Migration[6.1]
  def change
    add_column :followuptemplates, :name, :string
  end
end
