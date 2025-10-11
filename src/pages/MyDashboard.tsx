import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { PlusIcon, CheckCircleIcon, BoltIcon, GroupIcon, ShootingStarIcon } from "../icons";

export default function MyDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Completar proyecto React", completed: false, priority: "high" },
    { id: 2, title: "Revisar código del equipo", completed: true, priority: "medium" },
    { id: 3, title: "Actualizar documentación", completed: false, priority: "low" },
    { id: 4, title: "Preparar presentación", completed: false, priority: "high" },
  ]);

  const [newTask, setNewTask] = useState("");

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        title: newTask,
        completed: false,
        priority: "medium"
      }]);
      setNewTask("");
    }
  };

  const stats = [
    {
      title: "Tareas Completadas",
      value: tasks.filter(t => t.completed).length,
      icon: <CheckCircleIcon className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Tareas Pendientes",
      value: tasks.filter(t => !t.completed).length,
      icon: <BoltIcon className="w-8 h-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      title: "Total de Tareas",
      value: tasks.length,
      icon: <GroupIcon className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Progreso",
      value: `${Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%`,
      icon: <ShootingStarIcon className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div>
      <PageMeta
        title="Mi Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="Mi dashboard personalizado para gestión de tareas en TailAdmin"
      />
      <PageBreadcrumb pageTitle="Mi Dashboard" />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task Manager */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90">
              Gestor de Tareas
            </h3>
            
            {/* Add Task */}
            <div className="mb-6 flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Agregar nueva tarea..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <button
                onClick={addTask}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <PlusIcon className="w-4 h-4" />
                Agregar
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-lg border p-3 transition-colors ${
                    task.completed
                      ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/10"
                      : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span
                    className={`flex-1 text-sm ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Acciones Rápidas
            </h3>
            <div className="space-y-3">
              <button className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-left text-white transition-transform hover:scale-105">
                <div className="font-medium">Crear Nuevo Proyecto</div>
                <div className="text-sm opacity-90">Iniciar un proyecto desde cero</div>
              </button>
              <button className="w-full rounded-lg bg-gradient-to-r from-green-500 to-teal-600 px-4 py-3 text-left text-white transition-transform hover:scale-105">
                <div className="font-medium">Ver Reportes</div>
                <div className="text-sm opacity-90">Analizar métricas y estadísticas</div>
              </button>
              <button className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 text-left text-white transition-transform hover:scale-105">
                <div className="font-medium">Configuración</div>
                <div className="text-sm opacity-90">Ajustar preferencias del sistema</div>
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
              Actividad Reciente
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Nueva tarea creada</p>
                  <p className="text-xs text-gray-500">Hace 5 minutos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Tarea completada</p>
                  <p className="text-xs text-gray-500">Hace 1 hora</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-purple-500"></div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">Proyecto actualizado</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}