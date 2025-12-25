

const ToastMessage = ({ error, color }) => { //mensaje superpuesto a todo especial para mostrar mensaje criticos
    return (
        <div className="toast" style={{backgroundColor:color}}>
            <p>
                {error}
            </p>
            <small>
                Texto desde el small Toast
            </small>
        </div>
    )
}
export { ToastMessage }
