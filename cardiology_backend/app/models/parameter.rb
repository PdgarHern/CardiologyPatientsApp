class Parameter < ApplicationRecord
    belongs_to :hospital
    has_many :answers, dependent: :delete_all
    has_and_belongs_to_many :followuptemplates

    paginates_per 1
end
