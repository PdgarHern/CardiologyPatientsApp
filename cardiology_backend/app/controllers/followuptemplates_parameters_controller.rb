class FollowuptemplatesParametersController < ApplicationController
  before_action :set_followuptemplates_parameter, only: [:show, :update, :destroy]
  # before_action :authenticate_user!

  # GET /followuptemplates_parameters
  def index
    @q = FollowuptemplatesParameter.ransack(followuptemplate_id_eq: params[:id], parameter_name_cont: params[:search])

    @followuptemplates_parameters = @q.result(distinct: true).all.page params[:page]

    @followuptemplatesParametersSerialized = ActiveModelSerializers::SerializableResource.new(@followuptemplates_parameters).serializable_hash

    render json: {page: Integer(params[:page]), results: @followuptemplatesParametersSerialized, total_pages: @followuptemplates_parameters.total_pages}
  end

  # GET /followuptemplates_parameters/1
  def show
    render json: @followuptemplates_parameter
  end

  # POST /followuptemplates_parameters
  def create
    @followuptemplates_parameter = FollowuptemplatesParameter.new(followuptemplates_parameter_params)

    if @followuptemplates_parameter.save
      render json: @followuptemplates_parameter, status: :created, location: @followuptemplates_parameter
    else
      render json: @followuptemplates_parameter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followuptemplates_parameters/1
  def update
    if @followuptemplates_parameter.update(followuptemplates_parameter_params)
      render json: @followuptemplates_parameter
    else
      render json: @followuptemplates_parameter.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followuptemplates_parameters/1
  def destroy
    @followuptemplates_parameter.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followuptemplates_parameter
      @followuptemplates_parameter = FollowuptemplatesParameter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followuptemplates_parameter_params
      params.require(:followuptemplates_parameter).permit(:followuptemplate_id, :parameter_id)
    end
end
