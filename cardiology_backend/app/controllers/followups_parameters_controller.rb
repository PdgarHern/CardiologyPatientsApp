class FollowupsParametersController < ApplicationController
  before_action :set_followups_parameter, only: [:show, :update, :destroy]

  # GET /followups_parameters
  def index
    @followups_parameters = FollowupsParameter.all

    render json: @followups_parameters
  end

  # GET /followups_parameters/1
  def show
    render json: @followups_parameter
  end

  # POST /followups_parameters
  def create
    @followups_parameter = FollowupsParameter.new(followups_parameter_params)

    if @followups_parameter.save
      render json: @followups_parameter, status: :created, location: @followups_parameter
    else
      render json: @followups_parameter.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followups_parameters/1
  def update
    if @followups_parameter.update(followups_parameter_params)
      render json: @followups_parameter
    else
      render json: @followups_parameter.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followups_parameters/1
  def destroy
    @followups_parameter.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followups_parameter
      @followups_parameter = FollowupsParameter.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followups_parameter_params
      params.require(:followups_parameter).permit(:followup_id, :parameter_id)
    end
end
