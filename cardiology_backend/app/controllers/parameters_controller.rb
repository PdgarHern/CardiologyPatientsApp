class ParametersController < ApplicationController
  before_action :set_parameter, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /parameters
  def index
    @q = Parameter.ransack(name_cont: params[:search], hospital_id_eq: params[:hosp])

    @parameters = @q.result(distinc: true).all.page params[:page]

    @parametersSerialized = ActiveModel::SerializableResource.new(@parameters).serializable_hash

    render json: {page: Integer(params[:page]), results: @parametersSerialized, total_pages: @parameters.total_pages}
  end

  # GET /parameters/1
  def show
    render json: @parameter
  end

  # POST /parameters
  def create
    @parameter = Parameter.new(parameter_params)

    if @parameter.save
      render json: @parameter, status: :created, location: @parameter
    else
      render json: @parameter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /parameters/1
  def update
    if @parameter.update(parameter_params)
      render json: @parameter
    else
      render json: @parameter.errors, status: :unprocessable_entity
    end
  end

  # DELETE /parameters/1
  def destroy
    @parameter.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_parameter
      @parameter = Parameter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def parameter_params
      params.require(:parameter).permit(:name, :kind, :frequency, :hospital_id)
    end
end
