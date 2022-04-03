class ChatsController < ApplicationController
  before_action :set_chat, only: [:show, :update, :destroy]

  # GET /chats
  def index
    @q = Chat.ransack(doctor_id_eq: params[:doctorId], patient_id_eq: params[:patientId], name_cont: params[:search])

    @chats = @q.result(distinct: true).all.page params[:page]

    @chatsSerialized = ActiveModel::SerializableResource.new(@chats).serializable_hash

    render json: {page: Integer(params[:page]), results: @chatsSerialized, total_pages: @chats.total_pages}
  end

  # GET /chats/1
  def show
    render json: @chat
  end

  # POST /chats
  def create
    @chat = Chat.new(chat_params)

    if @chat.save
      render json: @chat, status: :created, location: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /chats/1
  def update
    if @chat.update(chat_params)
      render json: @chat
    else
      render json: @chat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /chats/1
  def destroy
    @chat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_chat
      @chat = Chat.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def chat_params
      params.require(:chat).permit(:name, :patient_id, :doctor_id)
    end
end
