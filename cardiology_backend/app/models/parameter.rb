class Parameter < ApplicationRecord
    belongs_to :hospital
    has_many :answers, dependent: :destroy
    has_and_belongs_to_many :followuptemplates

    paginates_per 10
end
