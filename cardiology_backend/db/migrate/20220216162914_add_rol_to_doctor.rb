class AddRolToDoctor < ActiveRecord::Migration[6.1]
  def change
    add_column :doctors, :rol, :string
    add_column :patients, :rol, :string
  end
end
