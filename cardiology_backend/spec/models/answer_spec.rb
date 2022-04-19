require 'rails_helper'

RSpec.describe Answer, type: :model do
  subject {
    described_class.new(
      value: 'Answer'
    )
  }

  describe 'Validations' do
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without value' do
      subject.value = nil
      expect(subject).to_not be_valid
    end
  end
  # pending "add some examples to (or delete) #{__FILE__}"
end
