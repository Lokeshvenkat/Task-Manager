import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '../components/utils/Input';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import validateManyFields from '../validations';

const Task = () => {
  // Get authentication state from Redux
  const authState = useSelector(state => state.authReducer);

  const navigate = useNavigate();
  const { taskId } = useParams();

  // Custom API fetching hook
  const [fetchData, { loading }] = useFetch();

  // Determine if page is "add" or "update" mode
  const mode = taskId === undefined ? "add" : "update";

  // Store task data (when editing)
  const [task, setTask] = useState(null);

  // Form state and validation errors
  const [formData, setFormData] = useState({ description: "" });
  const [formErrors, setFormErrors] = useState({});

  // Set dynamic page title based on mode
  useEffect(() => {
    document.title = mode === "add" ? "Add Task" : "Update Task";
  }, [mode]);

  // Fetch task data if updating
  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/tasks/${taskId}`,
        method: "get",
        headers: { Authorization: authState.token }
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  // Handle input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Reset form to original task data
  const handleReset = e => {
    e.preventDefault();
    setFormData({ description: task.description });
  };

  // Submit form (add or update task)
  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({}); // clear old errors

    // If validation errors, display them and stop submission
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    // Prepare API request config
    const config = {
      url: mode === "add" ? "/tasks" : `/tasks/${taskId}`,
      method: mode === "add" ? "post" : "put",
      data: formData,
      headers: { Authorization: authState.token }
    };

    // Submit to backend and redirect to home
    fetchData(config).then(() => navigate("/"));
  };

  // Render error for a specific field
  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <MainLayout>
      <form className='m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4'>
              {mode === "add" ? "Add New Task" : "Edit Task"}
            </h2>

            {/* Task description input */}
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <Textarea
                name="description"
                id="description"
                value={formData.description}
                placeholder="Write here.."
                onChange={handleChange}
              />
              {fieldError("description")}
            </div>

            {/* Action buttons */}
            <button
              className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark'
              onClick={handleSubmit}
            >
              {mode === "add" ? "Add Task" : "Update Task"}
            </button>

            <button
              className='ml-4 bg-red-500 text-white px-4 py-2 font-medium'
              onClick={() => navigate("/")}
            >
              Cancel
            </button>

            {mode === "update" && (
              <button
                className='ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600'
                onClick={handleReset}
              >
                Reset
              </button>
            )}
          </>
        )}
      </form>
    </MainLayout>
  );
};

export default Task;
