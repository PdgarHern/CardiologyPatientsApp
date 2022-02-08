class Parameter < ApplicationRecord
    has_and_belongs_to_many :followups
end
