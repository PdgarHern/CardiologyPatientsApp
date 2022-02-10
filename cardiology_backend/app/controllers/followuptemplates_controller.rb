class FollowuptemplatesController < ApplicationController
  before_action :set_followuptemplate, only: [:show, :update, :destroy]

  # GET /followuptemplates
  def index
    @followuptemplates = Followuptemplate.all

    render json: @followuptemplates
  end

  # GET /followuptemplates/1
  def show
    render json: @followuptemplate
  end

  # POST /followuptemplates
  def create
    @followuptemplate = Followuptemplate.new(followuptemplate_params)

    if @followuptemplate.save
      render json: @followuptemplate, status: :created, location: @followuptemplate
    else
      render json: @followuptemplate.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /followuptemplates/1
  def update
    if @followuptemplate.update(followuptemplate_params)
      render json: @followuptemplate
    else
      render json: @followuptemplate.errors, status: :unprocessable_entity
    end
  end

  # DELETE /followuptemplates/1
  def destroy
    @followuptemplate.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_followuptemplate
      @followuptemplate = Followuptemplate.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def followuptemplate_params
      params.require(:followuptemplate).permit(:hospital_id)
    end
end
