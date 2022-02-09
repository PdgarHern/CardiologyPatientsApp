class RenameColumnParameter < ActiveRecord::Migration[6.1]
  def change
    rename_column :parameters, :type, :kind
  end
end
