class FollowupsController < ApplicationController
  before_action :set_followup, only: [:show, :update, :destroy]

  # GET /followups
  def index
    @followups = Followup.all

    render json: @followups
  end

  # GET /followups/1
  def show
    render json: @followup
  end

  # POST /followups
  def create
    @followup = Followup.new(followup_params)

    if @followup.save
      render json: @followup, status: :created, location: @followup
    else
      render json: @followup.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followups/1
  def update
    if @followup.update(followup_params)
      render json: @followup
    else
      render json: @followup.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followups/1
  def destroy
    @followup.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followup
      @followup = Followup.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followup_params
      params.require(:followup).permit(:startDate, :endDate, :doctor_id)
    end
end
