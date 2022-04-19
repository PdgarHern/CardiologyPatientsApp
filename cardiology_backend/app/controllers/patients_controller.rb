class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /patients
  def index
    @q = Patient.ransack(user_id_eq: params[:id], name_cont: params[:search])
    @patients = @q.result(distinct: true).all.page params[:page]

    @patientsSerialized = ActiveModel::SerializableResource.new(@patients).serializable_hash

    render json: {page: Integer(params[:page]), results: @patientsSerialized, total_pages: @patients.total_pages}
  end

  # GET /patients/1
  def show
    render json: @patient
  end

  # POST /patients
  def create
    @patient = Patient.new(patient_params)

    if @patient.save
      @patient.user.invite!
      render json: @patient, status: :created, location: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /patients/1
  def update
    if @patient.update(patient_params)
      render json: @patient
    else
      render json: @patient.errors, status: :unprocessable_entity
    end
  end

  # DELETE /patients/1
  def destroy
    @patient.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def patient_params
      params.require(:patient).permit(:email, :name, :clinicRecord, :gender, :birthDate, :phoneNumber, :consentRGPD, :user_id, :hospital_id, :img)
    end
end
